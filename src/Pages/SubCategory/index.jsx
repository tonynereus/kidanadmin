import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const ManageSubCategories = () => {
    const [category, setCategory] = useState('');
    const [subCategories, setSubCategories] = useState({
        shopByType: [], forWomen: [], forMen: []
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state || !location.state.subCats) {
            alert("yes");
            //navigate("/dashboard/categories", { replace: true });
            return;
        }
        const data = location.state.subCats;
        setCategory(data.category);
        setSubCategories(data.subCategories);
    }, [location.state, navigate]);

    const handleSubCategoryClick = (subCategory) => {
        navigate("/dashboard/subcat-items", {
            state: { 
                subCategory:subCategory.subCategory,
                subCatId:subCategory.id,
                token: location.state.token,
                data: location.state.data
            }
        });
    };

    return (
        <div>
            <div className="w-100 p-3">
                <Typography.Title level={2}>{category}</Typography.Title>
            </div>
            <div className="w-100 p-2">
                <div className="w-100 m-0 row m-0 justify-content-center">
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>For Men</Typography.Title>
                        <ul>
                            {subCategories.forMen.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>By Type</Typography.Title>
                        <ul>
                            {subCategories.shopByType.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>For Women</Typography.Title>
                        <ul>
                            {subCategories.forWomen.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProtectedManageSubCategories = () => (
    <ProtectedRoute requiredState={['subCats', 'token', 'data']}>
        <ManageSubCategories />
    </ProtectedRoute>
);

export default ProtectedManageSubCategories;
