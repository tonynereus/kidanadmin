import { Typography } from "antd"
import LoadingCenter from "../../Components/LoadingCenter";
import { useEffect, useState } from "react";
import apis from "../../API/appapis";
import { Card } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";

const ManageCategories = () => {
    const [categories, setCategories] = useState();
    const nav = useNavigate();
    const mLocate = useLocation();
    useEffect(
        () => {
            fetch(apis.getCategories, {
                headers: {
                    'Content-Type': "application/json",
                },
                method: "GET"
            }).then(
                async x => {
                    const resu = await x.json();
                    Array.isArray(resu) ? setCategories(resu) : null;
                }
            );
        }, []
    );
    function enterSubSelect(obj) {
        nav("/dashboard/subcat", { state: { ...mLocate.state, subCats: obj } });
    }
    return (
        <>

            <div className="w-100 p-3">
                <Typography.Title level={3}>Manage Cateories</Typography.Title>
            </div>
            {
                Array.isArray(categories) ?
                    <>
                        <div className="w-100 p-2">
                            <div className="w-100 m-0 row m-0 justify-content-center">
                                {
                                    categories.map((x, ind) => {
                                        return (
                                            <Card

                                                onClick={() => { enterSubSelect(x) }}
                                                key={ind}
                                                style={{
                                                    width: 300,
                                                }}
                                                className="m-2 cardHover"
                                            >
                                                <Typography.Title>{x.category}</Typography.Title>
                                            </Card>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </> : <><LoadingCenter /></>
            }
        </>
    )
}
export default ManageCategories;