import Title from "../Title";
import styles from "./header.module.css";
import { MdCoronavirus } from "react-icons/md";

interface HeaderProps {
    title: React.ReactNode;
    logo: React.ReactNode; 
}

export default function Header({ title, logo, ...props }: HeaderProps) {
  return (
    <div>
      <header className={styles['custom-header']} {...props}>
        <div>
          <MdCoronavirus />
        </div>
        <Title>
            {title}
        </Title>
      </header>
    </div>
  );
}