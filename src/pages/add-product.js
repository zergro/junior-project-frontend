import { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

function AddProduct() {
    const [type, setType] = useState("");
    const [dimensions, setDimensions] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    // console.log(dimensions);

    const router = useRouter();

    const { register, handleSubmit, formState: {
        errors
    } } = useForm();


    const formatDimensions = (type, dimensions) => {
        if (type === 'Furniture') {
            const { height, width, length } = dimensions;
            return `Dimension: ${height}x${width}x${length}`;
        } else if (type === 'Book') {
            const { weight } = dimensions;
            return `Weight: ${weight}KG`;
        } else if (type === 'DVD') {
            const { size } = dimensions;
            return `Size: ${size} MB`;
        } else {
            // console.log('Invalid type or dimensions:', type, key, dimensions);
            return '';
        }
    }

    const onSubmit = (data) => {
        if (Object.keys(dimensions).length === 0) {
            setErrorMessage('Some of your inputs are not correct or missing.');
        } else {
            setErrorMessage('');
            const formattedDimensions = formatDimensions(type, dimensions);
            const dataToSend = {
                ...data,
                dimension: formattedDimensions
            };
            axios.post('products.php', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log(response.data);
                if (response.status === 201) {
                    console.log("Success");
                    handleRedirect();
                }
                else if (response.status === 409) {
                    setErrorMessage(response.data.error);
                    console.log("SKU error");
                }
                else {
                    console.log("Something strange happened");
                }
            });
        };
    }



    const handleSwitcher = (e) => {
        const selectedType = e.target.value;
        setType(selectedType);

        // reset the dimension if the type changes
        if (dimensions && type !== selectedType) {
            setDimensions("");
        }

    }

    const handleDimensions = (e) => {
        const { name, value } = e.target;

        if (!value) {
            setDimensions("");
            return;
        }

        if (type === "DVD") {
            setDimensions((prev) => ({
                ...prev,
                size: value,
            }));
        } else if (type === "Book") {
            setDimensions((prev) => ({
                ...prev,
                weight: value,
            }));
        } else if (type === "Furniture") {
            setDimensions((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <div className="addPage">
            <div className='productAddHeader'>
                <h1 className='header'>Add you product!</h1>
                <div className='productListButton'>
                    <button onClick={handleSubmit(onSubmit)} type="submit">Save</button>
                    <button id="cancel" onClick={handleRedirect}>Cancel</button>
                </div>
            </div>
            <form onSubmit={
                handleSubmit(onSubmit)
            } id="product_form">
                <label htmlFor="sku">SKU</label>
                <input name="sku" type="text" id="sku" {...register('sku', {
                    required: true,
                    maxLength: 30
                })} />
                {errors.sku && <p>Please, submit required data</p>}
                <br></br>
                <label htmlFor="name">Name
                </label>
                <input name="name" type="text" id="name" {...register('name', {
                    required: true,
                    maxLength: 30
                })} />
                {errors.name && <p>Please, submit required data</p>}
                <br></br>
                <label htmlFor="price">Price ($)
                </label>
                <input name="price" type="number" id="price" {...register('price', {
                    required: true,
                    maxLength: 30
                })} />
                {errors.price && <p>Please, submit required data</p>}
                <br></br>
                <label htmlFor="productType">Type Switcher
                </label>
                <select name="type" id="productType"
                    value={type}
                    onChange={(e) => handleSwitcher(e)}
                    required
                >
                    <option defaultValue="empty" disabled="disabled" value="empty">Select a product type</option>
                    <option value="DVD">DVD</option>
                    <option value="Book">Book</option>
                    <option value="Furniture">Furniture</option>
                </select>
                {
                    type === "DVD" && (
                        <>
                            <br></br>
                            <label htmlFor="size">Size (MB):
                            </label>
                            <input name="size" type="number" id="size"
                                onChange={handleDimensions}
                                required />
                            <br></br>
                            <p>* Please, provide size in megabytes.</p>
                        </>
                    )
                }
                {
                    type === "Book" && (
                        <>
                            <br></br>
                            <label htmlFor="weight">Size (KG):
                            </label>
                            <input name="weight" type="number" id="weight"
                                onChange={handleDimensions}
                                required />
                            <br></br>
                            <p>* Please, provide weight in kilograms.</p>
                        </>
                    )
                }
                {
                    type === 'Furniture' && (
                        <>
                            <br></br>
                            <label htmlFor="height">Height: (CM)</label>
                            <input name="height" type="number" id="height"
                                onChange={handleDimensions}
                                required />
                            <br></br>
                            <label htmlFor="width">Width: (CM)</label>
                            <input name="width" type="number" id="width"
                                onChange={handleDimensions}
                                required />
                            <br></br>
                            <label htmlFor="length">Length: (CM)</label>
                            <input name="length" type="number" id="length"
                                onChange={handleDimensions}
                                required />
                            <br></br>
                            <p>* Please, provide dimensions in HxWxL format.</p>
                        </>
                    )
                }
                <br></br>
            </form>
            <div style={{ color: 'red' }}>{errorMessage && <p>{errorMessage}</p>}</div>
        </div>
    )
}

export default AddProduct;
