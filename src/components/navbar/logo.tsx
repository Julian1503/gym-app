import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import {ReactNode} from "react";

type LogoProps = {
    variant: "h5" | "h6",
    href: string,
    sx: object,
    children: ReactNode,
    iconDisplay: object,
    textDisplay: object,
};

const Logo = ({variant, href, sx, children, iconDisplay, textDisplay}: LogoProps) => {
    return (
        <>
            <AdbIcon sx={{...iconDisplay, mr: 1}}/>
            <Typography
                variant={variant}
                noWrap
                component="a"
                href={href}
                sx={{...sx, ...textDisplay}}
            >
                {children}
            </Typography>
        </>
    );
};

export default Logo;
