import React from "react";

export interface GraphQLResult {
  data?: Record<string, any>;
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

const ShowItems = () => {
  const [list] = React.useState<GraphQLResult>();

  /* React.useEffect(() => {
    const fetch = async () => {
      try {
        let result = await API.graphql(graphqlOperation(listTodos));
        setList({ data: result });
      } catch (e) {
        alert(e);
      }
    };
    fetch();
  }, [list]); */

  if (list) {
    return (
      
      <div>
        <ul style={{ listStyleType: 'none' }}>
          {toDoList.items.map((item: { name: string }, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
      
    );
  } else {
    return <div></div>;
  }
};

export default ShowItems;
