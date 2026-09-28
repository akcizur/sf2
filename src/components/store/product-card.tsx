import { Link } from "react-router-dom";
import { formatPrice, type Product } from "@/lib/catalog.ts";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block cursor-pointer">
      <div className="neu-media aspect-square overflow-hidden rounded-[24px] bg-card transition duration-500 group-hover:-translate-y-0.5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between gap-3 px-1 pt-4">
        <h3 className="truncate text-sm font-medium transition group-hover:text-primary">{product.name}</h3>
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
