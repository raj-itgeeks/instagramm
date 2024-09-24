import React from 'react'

function ProductCard() {
    const product = {
        "id": 1,
        "name": "Slim Fit T-Shirt",
        "description": "A classic slim fit t-shirt made from high-quality cotton.",
        "price": 19.99,
        "currency": "USD",
        "brand": "FashionX",
        "category": "Tops",
        "subCategory": "T-Shirts",
        "images": [
            {
                "url": "https://example.com/image1.jpg",
                "alt": "Front view of the t-shirt"
            },
            {
                "url": "https://example.com/image2.jpg",
                "alt": "Back view of the t-shirt"
            }
        ],
        "sizes": [
            {
                "size": "S",
                "quantity": 10
            },
            {
                "size": "M",
                "quantity": 15
            },
            {
                "size": "L",
                "quantity": 20
            }
        ],
        "colors": [
            {
                "color": "White",
                "hexCode": "#FFFFFF"
            },
            {
                "color": "Black",
                "hexCode": "#000000"
            }
        ],
        "rating": 4.5,
        "reviews": 120
    }
    return (
        <div className="flex flex-col p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg">Price: {product.price} {product.currency}</p>
            <p className="text-gray-600">Brand: {product.brand}</p>
            <p className="text-gray-600">Category: {product.category} / {product.subCategory}</p>
            <div className="flex flex-wrap">
                {product.images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt} className="w-40 h-40 object-cover mr-4 mb-4" />
                ))}
            </div>
            <div className="flex flex-wrap">
                {product.sizes.map((size, index) => (
                    <span key={index} className="mr-4">{size.size} ({size.quantity} left)</span>
                ))}
            </div>
            <div className="flex flex-wrap">
                {product.colors.map((color, index) => (
                    <span key={index} style={{ backgroundColor: color.hexCode, width: 20, height: 20, display: 'inline-block', marginRight: 4 }}></span>
                ))}
            </div>
            <p className="text-lg">Rating: {product.rating} ({product.reviews} reviews)</p>
        </div>
    )
}

export default ProductCard 
