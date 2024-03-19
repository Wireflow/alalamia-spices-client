import Header from "../Header"
import ProductCard from "../ProductCard"


const HomePage = () => {
  return (
    <div className="w-full ">
        <div className="flex flex-col gap-5  ">
            <Header/>
            <div className="px-1  flex justify-between items-center">
                <h2 className="text-3xl font-medium">Menu</h2>
                <input placeholder="Search Inventory" className="rounded-full px-5 py-2"/>
            </div>
            <div className="overflow-y-scroll overflow-hidden rounded-xl h-[780px]">
              <div className="bg-zinc-800 p-5 flex items-center gap-5">
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
              </div>
              <div className="bg-zinc-800 p-5 flex items-center gap-5">
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
              </div>
              <div className="bg-zinc-800 p-5 flex items-center gap-5">
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
              </div>
              <div className="bg-zinc-800 p-5 flex items-center gap-5">
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
              </div>
              <div className="bg-zinc-800 p-5 flex items-center gap-5">
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
                 <ProductCard/>
              </div>
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
  )
}

export default HomePage