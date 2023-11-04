import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";
import { daysToMilliSeconds } from "@/lib/utils/constants";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - product.createdAt.getTime() < daysToMilliSeconds * 7;
  return (
    <Link
      href={`/product/${product.id}`}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={`${product.imageUrl}`}
          alt="Image not available"
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <div className="badge badge-secondary">NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </Link>
  );
}
