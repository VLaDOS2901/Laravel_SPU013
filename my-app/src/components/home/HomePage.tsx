import { useEffect, useState } from "react";
import http from "../../http_common";
import { IProductItem } from "./types";

//Запит на сервер, який повертає список продуктів
const HomePage = () => {
    const [list, setList] = useState<Array<IProductItem>>([]);
    useEffect(() => {
        http.get<Array<IProductItem>>("api/products")
            .then((resp) => {
                console.log("List product server", resp);
                setList(resp.data);
            });
    }, []);

    function Refresh() {
        http.get<Array<IProductItem>>("api/products")
            .then((resp) => {
                console.log("List product server", resp);
                setList(resp.data);
            });
    }
    const Delete = (id: number) => {
        http.delete("api/delete/" + id)
            .then((resp) => {
                console.log("List product server", resp.data);
                Refresh();
            });
    };

    const Add = () =>{
        const input1 = document.getElementById("name") as HTMLInputElement | null;
        const name = input1?.value;
        const input2 = document.getElementById("description") as HTMLInputElement | null;
        const description = input2?.value;
        console.log(name);
        console.log(description);
        const link = "/api/post/"+name+"/"+description;
        http.post(link)
            .then((resp) => {
                console.log("List product server", resp.data);
                Refresh();
            });

    };

    //map - foreach, але на TypeScript
    const data = list.map(product => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.detail}</td>
            <td className="align-middle"><button onClick={() => Delete(product.id)} className="btn btn-danger d-block m-auto" value={product.id}>Видалити</button></td>
        </tr>
    ));
    return (
        <>
            <h1 className="text-center">Головна сторінка</h1>            
                <div className="mb-3">
                    <label className="form-label">Назва</label>
                    <input type="text" className="form-control" id="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Опис</label>
                    <input type="text" className="form-control" id="description" />
                </div>
                <button onClick={() => Add()} className="btn btn-primary">Додати</button>
            

            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Detail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </table>
        </>
    )
};
export default HomePage;