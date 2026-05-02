import logoWebp from '../assets/logo/renjith.webp'
import logoPng from '../assets/logo/renjith.png'

export const Logo = () => (
    <picture>
        <source srcSet={logoWebp} type="image/webp" />
        <img
            src={logoPng}
            alt="Renjith K Ravindran"
            width={96}
            height={96}
            className="h-[26px] lg:h-[32px] w-auto rounded-md hover:scale-[105%] transition-all duration-50 ease-in-out"
        />
    </picture>
)
