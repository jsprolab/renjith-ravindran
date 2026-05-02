import { useData } from '../hooks'
import profileWebp from '../assets/about/renjith-profile.webp'
import profileJpeg from '../assets/about/renjith-profile.jpeg'

type AvatarProps = {
  absolute?: boolean
  width?: string
}

export const Avatar = ({ absolute }: AvatarProps) => {
    const { currentImgSelection } = useData();
    const isDefault = currentImgSelection === profileJpeg

    return (
        <picture>
            {isDefault && <source srcSet={profileWebp} type="image/webp" />}
            <img
                src={currentImgSelection}
                width={400}
                height={400}
                className={`w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] object-cover object-top rounded-full border-4 border-white dark:border-[#333] shadow-xl ${absolute ? "absolute" : "relative"} left-[50%] transform -translate-x-[50%] -mt-[80px] transition-all duration-200 ease-in-out`}
                alt="Renjith K Ravindran"
            />
        </picture>
    )
}
