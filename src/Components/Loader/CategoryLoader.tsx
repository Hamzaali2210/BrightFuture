import React from "react"
import ContentLoader,{Rect,Circle} from "react-content-loader/native"


interface MyLoaderInterface {
   width?:number;
   height?:number;
   backgroundColor?:string;
   foregroundColor?:string;
   rectWidth?:number;
   rectHeight?:number;
   rectRX?:number;
   rectRY?:number;
   rectX?:number;
   rectY?:number;
  
   
}


const CategoryLoader:React.FC<MyLoaderInterface> = ({
   width=400,
   height=180,
   backgroundColor="#f3f3f3",
   foregroundColor="#ecebeb",
   rectWidth=350,
   rectHeight=200,
   rectRX=20,
   rectRY=20,
   rectX=10,
   rectY=10,
}) => (
    <ContentLoader 
    speed={3}
    width={400}
    height={900}
    viewBox="0 0 400 900"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    {/* Header */}
    <Rect x="20" y="20" rx="4" ry="4" width="360" height="30" />
    {/* Live Users */}
    <Circle cx="50" cy="100" r="30" />
    <Circle cx="150" cy="100" r="30" />
    <Circle cx="250" cy="100" r="30" />
    <Circle cx="350" cy="100" r="30" />
    {/* Offers */}
    <Rect x="20" y="150" rx="10" ry="10" width="360" height="180" />
    {/* Categories */}
    <Rect x="20" y="350" rx="10" ry="10" width="80" height="80" />
    <Rect x="120" y="350" rx="10" ry="10" width="80" height="80" />
    <Rect x="220" y="350" rx="10" ry="10" width="80" height="80" />
    <Rect x="320" y="350" rx="10" ry="10" width="80" height="80" />
    {/* All Courses */}
    <Rect x="20" y="460" rx="10" ry="10" width="360" height="200" />
    <Rect x="20" y="680" rx="10" ry="10" width="360" height="200" />
    {/* Instructors */}
    <Circle cx="50" cy="910" r="40" />
    <Circle cx="150" cy="910" r="40" />
    <Circle cx="250" cy="910" r="40" />
    <Circle cx="350" cy="910" r="40" />
  </ContentLoader>
)

export default CategoryLoader
