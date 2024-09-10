import { Link } from "react-router-dom";

interface UserCollectionPops{

}

export default function UserCollection() {
  return (
    <>
      <Link to={'/my-page/favorites'} className="bg-white rounded-2xl w-full p-6 flex flex-col gap-2 items-center">
        <span className='fi fi-rr-heart text-red-600 inline-flex' aria-hidden={true}></span>
        <p className="text-stone-950 font-extrabold text-base">나의 찜</p>
      </Link>
      <Link to={'/my-page/reviews'} className="bg-white rounded-2xl w-full p-6 flex flex-col gap-2 items-center">
        <span className='fi fi-rr-comment-alt text-green-600 inline-flex' aria-hidden={true}></span>
        <p className="text-stone-950 font-extrabold text-base">나의 리뷰</p>
      </Link>
    </>
  )
}