import { useState } from "react";
import { Typography, Input, Button, message, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import apis from "../../API/appapis";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        highlight: [],
        composition: [],
        photo: null,
        morePicture: []
    });

    const location = useLocation();
    const { subCatId, token } = location.state || {};

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleCompositionChange = (index, value) => {
        const newComposition = [...formData.composition];
        newComposition[index] = value;
        setFormData({ ...formData, composition: newComposition });
    };

    const handleHighlightChange = (index, value) => {
        const newHighlight = [...formData.highlight];
        newHighlight[index] = value;
        setFormData({ ...formData, highlight: newHighlight });
    };

    const handleAddHighlight = () => {
        setFormData({ ...formData, highlight: [...formData.highlight, ""] });
    };

    const handleAddComposition = () => {
        setFormData({ ...formData, composition: [...formData.composition, ""] });
    };

    const handleRemoveHighlight = (index) => {
        const newHighlight = formData.highlight.filter((_, i) => i !== index);
        setFormData({ ...formData, highlight: newHighlight });
    };

    const handleRemoveComposition = (index) => {
        const newComposition = formData.composition.filter((_, i) => i !== index);
        setFormData({ ...formData, composition: newComposition });
    };

    const handlePhotoChange = (file) => {
        setFormData({ ...formData, photo: file });
    };

    const handleMorePictureChange = (index, file) => {
        const newMorePicture = [...formData.morePicture];
        newMorePicture[index] = file;
        setFormData({ ...formData, morePicture: newMorePicture });
    };

    const handleAddProduct = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("sub_cat_id", subCatId);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("photo", formData.photo);
            formData.highlight.forEach((highlight) => formDataToSend.append("highlight", highlight));
            formData.composition.forEach((composition) => formDataToSend.append("composition", composition));
            formData.morePicture.forEach((pic) => formDataToSend.append("morePicture", pic));

            const response = await fetch(apis.base + "uploadProduct", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to upload product");
            }

            message.success("Product uploaded successfully");
            // Redirect or do something else upon successful upload
        } catch (error) {
            console.error("Error uploading product:", error);
            message.error(error.message || "Failed to upload product. Please try again later.");
        }
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            <Typography.Title level={2}>Add Product</Typography.Title>
            <Space direction="vertical" size="large">
                <Input placeholder="Title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
                <Input placeholder="Price" type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
                <Input.TextArea placeholder="Description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
                <div>
                    <Typography.Text>Photo:</Typography.Text>
                    <Upload
                        beforeUpload={(file) => {
                            handlePhotoChange(file);
                            return false; // Prevent automatic upload
                        }}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Select Main Photo</Button>
                    </Upload>
                    {formData.photo && <span>{formData.photo.name}</span>}
                </div>
                <div>
                    <Typography.Text>Highlights:</Typography.Text>
                    {formData.highlight.map((highlight, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Highlight ${index + 1}`}
                                value={highlight}
                                onChange={(e) => handleHighlightChange(index, e.target.value)}
                            />
                            <Button onClick={() => handleRemoveHighlight(index)} type="danger">Remove</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddHighlight}>Add Highlight Field</Button>
                </div>
                <div>
                    <Typography.Text>Composition:</Typography.Text>
                    {formData.composition.map((comp, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Composition ${index + 1}`}
                                value={comp}
                                onChange={(e) => handleCompositionChange(index, e.target.value)}
                            />
                            <Button onClick={() => handleRemoveComposition(index)} type="danger">Remove</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddComposition}>Add Composition Field</Button>
                </div>
                <div>
                    <Typography.Text>More Pictures:</Typography.Text>
                    {formData.morePicture.map((pic, index) => (
                        <Upload
                            key={index}
                            beforeUpload={(file) => {
                                handleMorePictureChange(index, file);
                                return false; // Prevent automatic upload
                            }}
                            showUploadList={false}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    ))}
                    <Button onClick={() => setFormData({ ...formData, morePicture: [...formData.morePicture, ""] })}>Add More Picture</Button>
                </div>
            </Space>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleAddProduct}>Add Product</Button>
            </div>
        </div>
    );
};

export default AddProduct;
