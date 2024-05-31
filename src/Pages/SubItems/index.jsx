import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import apis from "../../API/appapis";

const SubCategoryItems = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { subCategory, subCatId, token, data } = location.state || {};

    const user = data;
    useEffect(() => {
        if (!subCategory || !subCatId) {
            navigate("/dashboard/categories", { replace: true });
            return;
        }

        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(apis.base+"getProductByCat", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ subCatId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [subCategory, subCatId, token, navigate]);

    const handleAddProductClick = () => {
        navigate("/dashboard/add-product", {
            state: {
                subCategory,
                subCatId,
                token,
                data:user
            }
        });
    };

    if (loading) {
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
    }

    const cardStyle = {
        width: 300,
        height: 300,
        margin: "16px",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    return (
        <div>
            <div className="w-100 p-3">
                <Typography.Title level={2}>{subCategory}</Typography.Title>
            </div>
            <div className="w-100 p-2 row m-0 justify-content-center">
                {products.map((product, ind) => (
                    <Card key={ind} title={product.name} style={cardStyle}>
                        <img src={product.img} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                        <Typography.Text>{product.description}</Typography.Text>
                        <div>
                            <strong>&#8358;<Typography.Text>{product.price}</Typography.Text></strong>
                        </div>
                    </Card>
                ))}
                <Button type="dashed" onClick={handleAddProductClick} style={{...cardStyle}} className="justify-content-center align-items-center">
                    <Typography.Title level={1}>+</Typography.Title>
                </Button>
            </div>
        </div>
    );
};

export default SubCategoryItems;
