import { useData } from '../hooks'

type AvatarProps = {
  absolute?: boolean
  width?: string
}

export const Avatar = ({ absolute, width } : AvatarProps) => {
    const { currentImgSelection } = useData();

    return (
        <img
          src={currentImgSelection}
          className={`w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] object-cover object-top rounded-full border-4 border-white dark:border-[#333] shadow-xl ${absolute ? "absolute" : "relative"} left-[50%] transform -translate-x-[50%] -mt-[80px] transition-all duration-200 ease-in-out`}
          alt="Renjith Ravindran"
        />
    )
}
