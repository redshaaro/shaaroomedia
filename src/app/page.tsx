import Addpost from "./components/Addpost"
import Feed from "./components/Feed"
import Leftmenu from "./components/Leftmenu"
import Rightmenu from "./components/Rightmenu"
import Stories from "./components/Stories"

const Homepage = () => {
  return (
    <div className='flex gap-6 p-5'>
      <div className="hidden xl:block w-[20%]"><Leftmenu type="home"></Leftmenu></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <Stories></Stories>
          <Addpost></Addpost>
          <Feed></Feed>


        </div>
      </div>
      <div className="hidden lg:block w-[30%] "><Rightmenu></Rightmenu></div>

    </div>
  )
}

export default Homepage