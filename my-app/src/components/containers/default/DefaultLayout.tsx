import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader />
            <div className="container">
                {/* <Outlet> Слід використовувати в батьківських
                елементах маршруту для відтворення їхніх дочірніх
                елементів. Це дозволяє вкладеному інтерфейсу 
                користувача відображатися під час візуалізації дочірніх
                маршрутів. Якщо батьківський маршрут точно збігається,
                він відтворить дочірній індексний маршрут або нічого,
                якщо індексного маршруту немає. */}
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;