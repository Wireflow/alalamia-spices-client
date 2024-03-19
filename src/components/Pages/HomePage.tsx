import Header from "../Header"
import ProductCard from "../ProductCard"


const HomePage = () => {
  return (
    <div className="w-full ">
        <div className="flex flex-col gap-5 ">
            <Header/>
            <div className="px-1  flex justify-between items-center">
                <h2 className="text-3xl font-medium">Menu</h2>
                <input placeholder="Search Inventory" className="rounded-full px-5 py-2"/>
            </div>
            <div className=" rounded-lg">
               <ProductCard/>
            </div>
        </div>
    </div>
  )
}

export default HomePage