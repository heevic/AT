import React from 'react';
import styles from '../../components/Admin/Admin.module.scss';
import AdminAside from "@/components/Admin/AsideAdmin/AdminAside";
import AdminSearchBar from "@/components/Admin/SearchAdmin/AdminSearchBar";
import AdminGridContainer from "@/components/Admin/ContentsAdmin/AdminGridContainer";
import AdminSvgItems from "@/components/Admin/AdminSvgItems";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";


const AdminPage = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user?.role !== 'admin' || null) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return (
        <main className={styles.container}>
            <svg style={{display: 'none'}}>
                <AdminSvgItems/>
            </svg>

            {/* AdminPage Header */}
            <div className={styles['page-header']}>
                <AdminAside/>
            </div>

            {/* AdminPage Content */}
            <section className={styles['page-content']}>
                <AdminSearchBar/>
                {/* AdminPage Grid Container */}
                <AdminGridContainer/>
            </section>
        </main>
    )
}

export default AdminPage;