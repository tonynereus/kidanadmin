import { Loading3QuartersOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

export default () => {
    return (
        <div className={styles.loader}>
            <Loading3QuartersOutlined spin={true} size={60}/>
        </div>
    )
}