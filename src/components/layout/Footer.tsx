import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';

export interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  variant?: 'default' | 'dark' | 'gradient' | 'simple';
  columns?: FooterColumn[];
  socialLinks?: FooterLink[];
  copyright?: string;
  className?: string;
  showNewsletter?: boolean;
  onNewsletterSubmit?: (email: string) => void;
}

export function Footer({
  variant = 'default',
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Data Analyst Learning. All rights reserved.`,
  className,
  showNewsletter = true,
  onNewsletterSubmit,
}: FooterProps) {
  const variantClasses = {
    default: 'bg-white border-t border-gray-200',
    dark: 'bg-gray-900 text-white border-t border-gray-800',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    simple: 'bg-gray-50 border-t border-gray-200',
  };

  const textColorClasses = {
    default: 'text-gray-600',
    dark: 'text-gray-300',
    gradient: 'text-white/80',
    simple: 'text-gray-600',
  };

  const linkColorClasses = {
    default: 'text-gray-500 hover:text-gray-700',
    dark: 'text-gray-400 hover:text-white',
    gradient: 'text-white/70 hover:text-white',
    simple: 'text-gray-500 hover:text-gray-700',
  };

  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onNewsletterSubmit) {
      onNewsletterSubmit(email);
      setEmail('');
    }
  };

  return (
    <footer
      className={cn(
        'w-full transition-colors',
        variantClasses[variant],
        className
      )}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
                DA
              </div>
              <span className={cn(
                'text-xl font-bold',
                variant === 'dark' || variant === 'gradient' ? 'text-white' : 'text-gray-800'
              )}>
                Data<span className="text-blue-500">Analyst</span>
              </span>
            </Link>
            <p className={cn(
              'text-sm',
              textColorClasses[variant]
            )}>
              Platform pembelajaran Data Analyst dari nol sampai siap kerja dalam 6 bulan.
              Belajar dengan sistem terstruktur dan proyek nyata.
            </p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      variant === 'dark' || variant === 'gradient'
                        ? 'hover:bg-white/10'
                        : 'hover:bg-gray-100'
                    )}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className={cn(
                'text-sm font-semibold mb-4',
                variant === 'dark' || variant === 'gradient' ? 'text-white' : 'text-gray-900'
              )}>
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'text-sm transition-colors flex items-center gap-2',
                        linkColorClasses[variant]
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {showNewsletter && (
            <div>
              <h3 className={cn(
                'text-sm font-semibold mb-4',
                variant === 'dark' || variant === 'gradient' ? 'text-white' : 'text-gray-900'
              )}>
                📧 Newsletter
              </h3>
              <p className={cn(
                'text-sm mb-3',
                textColorClasses[variant]
              )}>
                Dapatkan tips dan update terbaru tentang data analyst.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email kamu..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    'flex-1 px-3 py-2 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2',
                    variant === 'dark' || variant === 'gradient'
                      ? 'bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-white/30'
                      : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-blue-500'
                  )}
                  required
                />
                <button
                  type="submit"
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                    variant === 'dark' || variant === 'gradient'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  Subscribe
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className={cn(
          'mt-8 pt-8 border-t',
          variant === 'dark' || variant === 'gradient'
            ? 'border-white/10'
            : 'border-gray-200'
        )}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={cn(
              'text-sm',
              textColorClasses[variant]
            )}>
              {copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className={cn(
                  'text-sm transition-colors',
                  linkColorClasses[variant]
                )}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={cn(
                  'text-sm transition-colors',
                  linkColorClasses[variant]
                )}
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className={cn(
                  'text-sm transition-colors',
                  linkColorClasses[variant]
                )}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'Program',
    links: [
      { label: 'Roadmap 6 Bulan', href: '/roadmap' },
      { label: 'Materi Pembelajaran', href: '/learning' },
      { label: 'Projects', href: '/projects' },
      { label: 'Resources', href: '/resources' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Career', href: '/career' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

const defaultSocialLinks: FooterLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    external: true,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    external: true,
  },
];

export default Footer;
