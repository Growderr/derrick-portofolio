import CertificateFilter from '@/components/certificates/CertificateFilter'

/** Category filter for the blog. Same toggle-button pattern as the certificate filter. */
export default function BlogFilter({ options, active, onChange, className }) {
  return (
    <CertificateFilter
      options={options}
      active={active}
      onChange={onChange}
      label="Saring artikel berdasarkan kategori"
      className={className}
    />
  )
}
