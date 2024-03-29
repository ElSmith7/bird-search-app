import useNativeLazyLoading from "@charlietango/use-native-lazy-loading";
import { useInView } from "react-intersection-observer";

const LazyImage = ({ width, height, color, alt, src, ...rest }) => {
  const supportsLazyLoading = useNativeLazyLoading();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "50px 0px",
    skip: supportsLazyLoading !== false,
  });

  return (
    <div
      data-testid="background"
      ref={ref}
      style={{
        position: "relative",
        paddingBottom: `${(height / width) * 100}%`,
        background: `#${color}`,
      }}
    >
      {inView || supportsLazyLoading ? (
        <img
          {...rest}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          style={{
            position: "absolute",
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
