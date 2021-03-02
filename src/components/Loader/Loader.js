import React from "react";
import {Spinner} from "react-bootstrap";
import styles from './loader.module.scss'

export default function Loader() {
    return (
        <div className={styles['loader-holder']}>
            <Spinner
                className={styles.loader}
                animation="border"
                role="status"
            >
                <span className="sr-only">Loading</span>
            </Spinner>
        </div>
    )
}