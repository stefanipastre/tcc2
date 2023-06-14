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
from matplotlib_venn import venn2
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.snowball import SnowballStemmer
from nltk.stem.wordnet import WordNetLemmatizer

def executar():
    s3_resource = boto3.resource('s3', aws_access_key_id='',
    aws_secret_access_key='') 
    s3 = boto3.client('s3', aws_access_key_id='',
    aws_secret_access_key='') 
    bucket = s3_resource.Bucket('') 

    response = s3.list_objects_v2(Bucket='')
    all = response['Contents']        
    latest = max(all, key=lambda x: x['LastModified'])
    empresa_atual = latest['Key'].split('/')
    empresa_atual = empresa_atual[0]
    s3.download_file('new-files-tcc-2-neww', 'empresa.csv', 'empresa.csv')
    s3.download_file('new-files-tcc-2-neww', 'riscos.csv', 'riscos.csv')
    
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
    temporario = []
    try:
        all_filenames.remove('combined_csv.csv')
    except ValueError:
        pass
    combined_csv = [pd.read_csv(arquivo) for arquivo in all_filenames]
    for j in all_filenames:
        a = pd.read_csv(j) 
        for col in a.columns:
            temporario.append(col)
    with open('combined_csv.csv', 'w', newline='') as myfile:
        wr = csv.writer(myfile, quoting=csv.QUOTE_ALL)
        wr.writerow(temporario)
    n=1
    lista_resultados = []
    lista_valores = []
    lista_elementos = []
    dictOfWords = {}
    intersection_list = []
    A_count = []
    counts = CountVectorizer(analyzer='word', ngram_range=(n,n))
    os.chdir('..')
    with open('riscos.csv') as f:
        matches = f.readlines()[-1]
        #matches = [i.strip() for i in f]

    with open(empresa_atual+'/combined_csv.csv', encoding='utf-8-sig') as f:
        for i in f:
            i = i.replace('\n', '')
            li = list(i.split(","))
            matches = matches.split(",")
            for u in matches:
                c = u.replace("\n", "")
                lista_resultados.append(c)
                lista_resultados = list(set(lista_resultados))
            for casos in li:
                for c in matches:
                    c = c.replace("\n", "")
                    vect = CountVectorizer(analyzer = 'word', ngram_range= (1, 2)) 
                    palavraProibida1 = "area 1"
                    palavraProibida2 = "area 2"
                    palavraProibida3 = "area 3"
                    palavraProibida4 = "extintor"

                    if palavraProibida1 in c:
                        if palavraProibida1 in casos:
                            vocab = vect.fit([casos, c])
                            test = vect.fit_transform([casos, c])
                            test = test.toarray()
                            intersection_list = np.amin(test, axis = 0) # Intersecção
                            sum = np.sum(intersection_list) 
                            count = np.sum(test[0]) 
                            resultado = float(sum/count)
                            if (resultado >= 0.6):
                                lista_resultados.append(c)
                    if palavraProibida2 in c:
                        if palavraProibida2 in casos:
                            vocab = vect.fit([casos, c])
                            test = vect.fit_transform([casos, c])
                            test = test.toarray()
                            intersection_list = np.amin(test, axis = 0) # Intersecção
                            sum = np.sum(intersection_list) 
                            count = np.sum(test[0]) 
                            resultado = float(sum/count)
                            if (resultado >= 0.6):
                                lista_resultados.append(c)
                    if palavraProibida3 in c:
                        if palavraProibida3 in casos:
                            vocab = vect.fit([casos, c])
                            test = vect.fit_transform([casos, c])
                            test = test.toarray()
                            intersection_list = np.amin(test, axis = 0) # Intersecção
                            sum = np.sum(intersection_list) 
                            count = np.sum(test[0]) 
                            resultado = float(sum/count)
                            if (resultado >= 0.6):
                                lista_resultados.append(c)
                    if palavraProibida4 in c:
                        if palavraProibida4 in casos:
                            vocab = vect.fit([casos, c])
                            test = vect.fit_transform([casos, c])
                            test = test.toarray()
                            intersection_list = np.amin(test, axis = 0) # Intersecção
                            sum = np.sum(intersection_list) 
                            count = np.sum(test[0]) 
                            resultado = float(sum/count)
                            if (resultado >= 0.6):
                                lista_resultados.append(c)
    lista1= list(1 for i in lista_resultados)
    lst_tuple = list(zip(lista_resultados,lista1))
    result = {}
    for card, value in lst_tuple:
        total = result.get(card, 0) + value 
        result[card] = total
    (pd.DataFrame.from_dict(data=result, orient='index')
    .to_csv('output.csv', header=True))
    
    try:
        dados = pd.read_csv('output.csv')
        dados = dados.rename(columns={'Unnamed: 0': 'situacao_risco', '0': 'n_ocorrencias'})
        a = dados['situacao_risco']
        b = dados['n_ocorrencias']
        b = b - 1
        style.use('ggplot')
        fig=plt.figure()
        plt.xlabel('Casos de Risco', fontsize = 18) 
        plt.ylabel('Ocorrências', fontsize = 18)
        plt.legend(['Casos Obtidos'], fontsize = 17) 
        plt.xticks(rotation=90)
        plt.plot(a,b)
        plt.scatter(a,b)
        plt.savefig('foo.png', dpi=100, bbox_inches='tight')
        plt.cla()
        plt.clf()
        plt.close()
        bucket.upload_file('output.csv', empresa_atual + '_exit/finalfile.csv')
        bucket.upload_file('foo.png', empresa_atual + '_exit/finalgraph.png')
    except KeyError:
        pass

schedule.every(3).seconds.do(executar)
while True:
    schedule.run_pending()