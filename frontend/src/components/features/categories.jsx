import { ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Categories() {
    const category=useSelector((state)=>state.category.categories)
    console.log(category);
    
  return (
    <section id="categories" className="min-h-screen bg-[#F7F6F2] px-5 py-12 text-[#1C1917] sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#064E3B]">SHOP BY CATEGORY</p>
        <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Find your <span className="font-serif italic text-[#064E3B]">something.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
              Explore pieces picked for every corner of your everyday life.
            </p>
          </div>
          <a href="#shop" className="text-sm font-medium text-[#064E3B] underline underline-offset-4 transition hover:text-[#022C22]">
            Shop all pieces
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.map((category,index)=>(
            <Link to={category?.name} className="group relative aspect-[4/3] overflow-hidden bg-stone-200">
            <img src={category?.image?.url} alt={category?.name} className="size-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <span className="absolute left-5 top-5 text-xs font-semibold tracking-[0.2em] text-white/85">{index}</span>
            <span className="absolute bottom-5 left-5 font-serif text-3xl text-white">{category?.name}</span>
            <span className="absolute bottom-5 right-5 grid size-10 place-items-center rounded-full border border-white/70 text-white transition group-hover:bg-white group-hover:text-[#064E3B]"><ArrowUpRight aria-hidden="true" size={20} /></span>
          </Link>
            ))}

        </div>
      </div>
    </section>
  );
}

export default Categories;
