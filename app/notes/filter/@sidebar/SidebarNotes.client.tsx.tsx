'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getAllTags } from '@/lib/api';
import css from './SidebarNotes.module.css';

export default function SidebarNotesClient() {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: getAllTags,
  });

  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
