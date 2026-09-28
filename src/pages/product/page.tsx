import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { formatPrice, getCategory, getProduct } from "@/lib/catalog.ts";
import { useCart } from "@/hooks/use-cart.tsx";
import Breadcrumbs from "@/components/store/breadcrumbs.tsx";
import QuantitySelector from "@/components/store/quantity-selector.tsx";
import NotFound from "../NotFound.tsx";

export default function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProduct(slug);
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();
  if (!product) return <NotFound />;
  const category = getCategory(product.category);

  return (
    <div className="pb-12">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          ...(category ? [{ label: category.name, to: `/shop/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="grid gap-12 pt-8 lg:grid-cols-[600px_1fr]">
        <img
          src={product.image}
          alt={product.name}
          className="neu-media aspect-[600/560] w-full rounded-[24px] object-cover"
        />

        <div className="lg:pt-6">
          <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">{category?.name}</p>
          <h1 className="pt-3 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="pt-6 text-2xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="max-w-lg pt-6 text-muted-foreground">{product.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={() => {
                add(product.slug, quantity);
                setQuantity(1);
              }}
              className="neu-button inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-[30px] bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              <ShoppingBag className="size-4" /> Add to cart
            </button>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-border/60 pt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Details</p>
            <h2 className="pt-3 text-2xl font-semibold tracking-tight">Product information</h2>
            <p className="max-w-md pt-4 text-sm leading-6 text-muted-foreground">
              A simple overview of the materials, making and everyday use behind this piece.
            </p>
          </div>

          <div className="neu-surface overflow-hidden rounded-[20px]">
            <dl className="divide-y divide-border/60">
              {product.specifications.map((item) => (
                <div key={item.label} className="grid grid-cols-[minmax(110px,0.7fr)_1fr] gap-6 px-6 py-4 sm:px-7">
                  <dt className="text-sm text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">Specifications</p>
            <h2 className="pt-3 text-2xl font-semibold tracking-tight">At a glance</h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">{category?.name}</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {product.specifications.map((item) => (
            <div key={item.label} className="neu-surface rounded-[20px] p-6 transition duration-300 hover:-translate-y-0.5">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">{item.label}</p>
              <p className="pt-4 text-sm leading-6">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
