import numpy as np
import sklearn
from sklearn.feature_extraction.text import CountVectorizer
import csv
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import style
import boto3
import os
from pathlib import Path
import glob
import schedule
import time

def executar():
    s3_resource = boto3.resource('s3', aws_access_key_id='',
    aws_secret_access_key='') 
    empresa_atual = ''
    s3_resource = boto3.resource('s3')
    bucket = s3_resource.Bucket('new-files-tcc-2-new') 
    bucket.download_file('empresa.csv', 'empresa.csv')
    with open('empresa.csv') as fileempresa:
        for linha1 in fileempresa:
            empresa_atual = linha1


    for obj in bucket.objects.filter(Prefix = empresa_atual):
        if not os.path.exists(os.path.dirname(obj.key)):
            os.makedirs(os.path.dirname(obj.key))
        bucket.download_file(obj.key, obj.key)
    os.chdir(empresa_atual + "/")
    extension = 'csv'
    all_filenames = [i for i in glob.glob('*.{}'.format(extension))]
    combined_csv = [pd.read_csv(arquivo) for arquivo in all_filenames]
    combined_csv = pd.concat([pd.read_csv(f) for f in all_filenames ])
    combined_csv.to_csv( "combined_csv.csv", index=False, encoding='utf-8-sig')

    #número de n_gramas
    n=1
    lista_resultados = []
    lista_temp = []
    lista_valores = []
    lista_elementos = []
    dictOfWords = {}
    intersection_list = []
    A_count = []
    #instancia o contador de n-gramas
    counts = CountVectorizer(analyzer='word', ngram_range=(n,n))
    os.chdir('..')

    with open('arquivo_treinov2.csv') as f:
        matches = [i.strip() for i in f]

    # Iterate over file1 and place any matches into the output.
    with open(empresa_atual+'/combined_csv.csv') as f:
        for i in f:
            i = i.replace('\n', '')
            li = list(i.split(","))
            for casos in li:
                for c in matches:
                    n_grams = counts.fit_transform([str(casos), str(c)])
                    n_grams.toarray()
                    intersection_list= np.amin(n_grams.toarray(),axis=0)
                    intersection_count = np.sum(intersection_list)
                    index_A = 0
                    A_count = np.sum(n_grams.toarray()[index_A])
                    elementos = intersection_count/A_count
                    dictOfWords = { i : str(elementos) for i in str(c) }
                    lista_valores.append(str(c))
                    lista_elementos.append(str(elementos))
                    zipbObj = zip(lista_valores, lista_elementos)
                dictOfWords = dict(zipbObj)
                max_val = list(dictOfWords.values())
                max_ke = list(dictOfWords.keys())
                aux_match = max_ke[max_val.index(max(max_val))]
                lista_resultados.append(aux_match)

    lista1= list(1 for i in lista_resultados)
    lst_tuple = list(zip(lista_resultados,lista1))
    result = {}
    for card, value in lst_tuple:
        total = result.get(card, 0) + value
        result[card] = total
    (pd.DataFrame.from_dict(data=result, orient='index')
    .to_csv('output.csv', header=True))
    dados = pd.read_csv('output.csv')
    dados = dados.rename(columns={'Unnamed: 0': 'situacao_risco', '0': 'n_ocorrencias'})
    a = dados['situacao_risco']
    b = dados['n_ocorrencias']
    style.use('ggplot')
    fig=plt.figure()
    plt.xlabel('Casos de Risco', fontsize = 18) 
    plt.ylabel('Ocorrências', fontsize = 18)
    plt.legend(['Casos Obtidos'], fontsize = 17) 
    plt.plot(a,b)
    plt.scatter(a,b)
    fig.set_size_inches((15, 6), forward=False)
    plt.savefig('foo.png', dpi=100)
    plt.cla()
    plt.clf()
    plt.close()

schedule.every(10).seconds.do(executar)
while True:
    schedule.run_pending()
    #time.sleep(1)