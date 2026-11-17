import { UserRound } from 'lucide-react'
import { useProfile } from '@/lib/content'
import { profileImageUrl } from '@/lib/profileImage'
import { cn } from '@/lib/cn'

/**
 * 4:5 portrait frame. Shows the photo uploaded in the admin panel, else
 * src/assets/images/profile.* when present, otherwise a clearly labelled placeholder.
 */
export default function ProfilePhoto({ className }) {
  const profile = useProfile()
  const photoUrl = profile.avatar?.src ?? profileImageUrl

  return (
    <div className={cn('aspect-[4/5] w-full', className)}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={profile.avatar?.alt || `Potret ${profile.name}`}
          className="size-full border-2 border-ink object-cover"
          width={800}
          height={1000}
          fetchPriority="high"
        />
      ) : (
        <div
          role="img"
          aria-label="Tempat foto profil"
          className="flex size-full flex-col items-center justify-center gap-3 border-2 border-dashed border-ink bg-paper p-6 text-center"
        >
          <UserRound aria-hidden="true" size={44} strokeWidth={1.5} />
          <p className="text-h3">Foto profil akan ditempatkan di sini</p>
          <p className="max-w-[16rem] text-sm text-muted">
            Unggah foto potret (4:5) lewat Panel Admin, bagian Profil, dan bingkai ini akan terganti.
          </p>
        </div>
      )}
    </div>
  )
}
