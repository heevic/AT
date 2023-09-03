'use client';
import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MenuItemProps, MenuItem } from '@/types/Navigation';

const GlobalNavItems = ({ gblMenuItems }: MenuItemProps) => {
    const { data: session } = useSession();
    const currentRoute = usePathname();

    return (
        <ul className={styles.navMenu}>
            {gblMenuItems.map((item) => {
                const isActive = currentRoute === item.route || (item.subMenu?.some(subItem => currentRoute === subItem.route));
                const myPageLink = session?.user?._id ? `/user/mypage/${session.user.name}` : '/login';
                const hasSubMenu = item.subMenu && item.subMenu.length > 0;
                const SubMenuhasSubMenu = item.subMenu && item.subMenu.some(subItem => subItem.subMenu && subItem.subMenu.length > 0);

                return (
                    <li
                        className={`${styles.navItem}`}
                        key={item.route}
                    >
                        <Link
                            href={item.title === '마이페이지' ? myPageLink : item.route}
                            className={`${styles.navLink} ${isActive ? styles.activeLink : styles.nonActiveLink}`}
                        >
                            {item.title}
                        </Link>
                        {hasSubMenu && (
                            <ul className={styles.subMenu}>
                                {item.subMenu?.map(subItem => (
                                    <li key={subItem.route}>
                                        <Link href={subItem.route}>{subItem.title}</Link>
                                        {SubMenuhasSubMenu && subItem.subMenu && subItem.subMenu.length > 0 && (
                                            <ul className={styles.subSubMenu}>
                                                {subItem.subMenu.map(subSubMenu => (
                                                    <li key={subSubMenu.route}>
                                                        <Link href={subSubMenu.route}>{subSubMenu.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default GlobalNavItems;