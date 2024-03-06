import { FaArrowRight } from "react-icons/fa";
import cn from 'classnames';
import styles from "./Home.module.scss";// Import your SCSS module for styles
import { useNavigate } from "react-router-dom";

interface Tool {
    href: string;
    label: string;
    bgColor: string;
    color: string;
    icon: React.ComponentType<{ className: string }>;
}

interface ToolCardsProps {
    tools: Tool[];
}

const Home: React.FC<ToolCardsProps> = ({ tools }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={styles.dashboardHeader}>
                <h2 className={styles.dashboardTitle}>
                    Explore the power of AI
                </h2>
                <p className={styles.dashboardContent}>
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <div className={styles.dashboardCard}>
                {tools.map((tool) => (
                    <div onClick={() => navigate(tool.href)} key={tool.href} className={styles.card}>
                        <div className={styles.cardBox}>
                            <div className={cn(styles.p2, styles.wFit, styles.roundedMd, tool.bgColor)}>
                                <tool.icon className={`${styles.w8} ${styles.h8} ${tool.color}`} />
                            </div>
                            <div className={styles.fontSemibold}>
                                {tool.label}
                            </div>
                        </div>
                        <FaArrowRight className={styles.arrowRight} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
