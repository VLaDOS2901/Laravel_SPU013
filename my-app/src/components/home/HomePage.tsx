import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import http from "../../http_common";
import { GetProductAction, IProductItem, IProductResponse, IProductState, ProductActionTypes } from "./types";

//Запит на сервер, який повертає список продуктів
const HomePage = () => {
    // const [list, setList] = useState<Array<IProductItem>>([]);
    const { list, total, count_page } = useSelector((state: any) => state.product as IProductState);
    const dispatch = useDispatch(); //посилає запити на систему
    useEffect(() => {
        http.get<IProductResponse>("/api/products").then((resp) => {
          console.log("List product server", resp);
          const {data} = resp;
    
          const payload: IProductState = {
            list: data.data,
            count_page: data.last_page,
            current_page: data.current_page,
            total: data.total
          };
    
          const action: GetProductAction = {
            type: ProductActionTypes.GET_PRODUCTS,
            payload: payload
          };
    
          dispatch(action);
        });
      }, []);

    function Refresh() {
        // http.get<Array<IProductItem>>("api/products")
        //     .then((resp) => {
        //         console.log("List product server", resp);
        //         setList(resp.data);
        //     });
    }
    const Delete = (id: number) => {
        http.delete("api/delete/" + id)
            .then((resp) => {
                console.log("List product server", resp.data);
                Refresh();
            });
    };

    const Add = () => {
        const input1 = document.getElementById("name") as HTMLInputElement | null;
        const name = input1?.value;
        const input2 = document.getElementById("description") as HTMLInputElement | null;
        const description = input2?.value;
        console.log(name);
        console.log(description);
        const link = "/api/post/" + name + "/" + description;
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

    const buttons: Array<number> = [];
    for (let i = 1; i <= count_page; i++) {
      buttons.push(i);
    }
  
    const pagination = buttons.map(page => {
      return (
        <li key={page} className="page-item">
          <Link to={"?page="+page} className="page-link">{page}</Link>
        </li>
      );
    }); 
    return (
        <>
            <h1 className="text-center">Головна сторінка</h1>
            <h4>Всього записів <strong>{total}</strong></h4>
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
            <nav>
                <ul className="pagination">
                    {pagination}
                </ul>
            </nav>
        </>
    )
};
export default HomePage;