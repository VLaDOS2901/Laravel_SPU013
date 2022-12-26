import { useEffect, useState } from "react";
import http from "../../http_common";
import { IProductItem } from "./types";

//Запит на сервер, який повертає список продуктів
const HomePage = () =>{
    const [list, setList] = useState<Array<IProductItem>>([]);
    useEffect(()=>{
        http.get<Array<IProductItem>>("api/products")
        .then((resp)=>{
            console.log("List product server", resp);
            setList(resp.data);
        });
    }, []);
    //map - foreach, але на TypeScript
  const data = list.map(product=> (
    <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.detail}</td>
    </tr>
));
    return(
        <>
        <h1 className="text-center">Головна сторінка</h1>
        
<table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
            </table>
        </>
    )
};
export default HomePage;