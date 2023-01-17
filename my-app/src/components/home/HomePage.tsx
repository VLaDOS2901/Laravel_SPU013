import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import http from "../../http_common";
import { GetProductAction, IProductItem, IProductResponse, IProductState, ProductActionTypes } from "./types";

//Запит на сервер, який повертає список продуктів
const HomePage = () => {
    // const [list, setList] = useState<Array<IProductItem>>([]);
    const location = useLocation();
    let link = "";
    if (location.state != null)
        link = location.state;
    console.log(link);


    const { list, total, count_page } = useSelector((state: any) => state.product as IProductState);
    const dispatch = useDispatch(); //посилає запити на систему
    useEffect(() => {
        http.get<IProductResponse>("/api/products" + link).then((resp) => {
            console.log("List product server", resp);
            const { data } = resp;

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

    function Search() {
        const input = document.getElementById("search_name") as HTMLInputElement | null;
        const name = input?.value; 
        link += "&name=" + name;
        http.get<IProductResponse>("/api/products" + link).then((resp) => {
            console.log("List product server", resp);
            const { data } = resp;

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

    }

    function refreshPage() {
        setTimeout(() => {
            window.location.reload();
        }, 100);
        console.log('page to reload')
    }
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
                <Link to={"?page=" + page} state={"?page=" + page} onClick={refreshPage} className="page-link">{page}</Link>
            </li>
        );
    });
    return (
        <>
            <h1 className="text-center">Головна сторінка</h1>
            <h4>Всього записів <strong>{total}</strong></h4>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input id="search_name" type="text" className="form-control" />
                </div>
                <div className="col-auto">
                    <button type="button" onClick={Search} className="btn btn-primary">Search</button>
                </div>
            </div>
            {/* <div className="mb-3">
                <label className="form-label">Назва</label>
                <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label className="form-label">Опис</label>
                <input type="text" className="form-control" id="description" />
            </div>
            <button onClick={() => Add()} className="btn btn-primary">Додати</button> */}


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