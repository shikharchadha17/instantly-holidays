// Social icons as inline SVGs (no expired URLs)
const SOCIAL_ICONS = [
  { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "X/Twitter", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Pinterest", path: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" },
];

export default function Footer() {
  return (
    <footer
      className="text-white rounded-tl-[32px] rounded-tr-[32px]"
      style={{ background: "#07213a" }}
    >
      <div className="px-6 sm:px-10 md:px-20 pt-10 pb-0 flex flex-col gap-6">
        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-8 sm:gap-4">
          {/* Col 1: tagline + socials */}
          <div className="flex flex-col gap-6 w-full sm:w-[280px] md:w-[379px]">
            <p className="font-normal text-[14px] text-white leading-[22px]">
              Plan less. Travel more.Instant holidays designed for effortless booking and seamless experiences.
            </p>
            <div className="flex gap-3 items-center">
              {SOCIAL_ICONS.map((icon) => (
                <a key={icon.label} href="#" className="bg-white rounded-full w-[34px] h-[34px] flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#07213a">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 + 3: links */}
          <div className="flex gap-8 md:gap-[76px] items-start">
            <div className="flex flex-col gap-4 w-[118px]">
              {["About Us", "Blogs", "Testimonials", "Contact Us"].map((l) => (
                <a key={l} href="#" className="font-normal text-[14px] text-white leading-[22px] hover:opacity-80 transition-opacity">{l}</a>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-[157px]">
              {["Terms of Service", "Privacy Policy", "Cancellation Poilcy", "Contact Us", "Payment Policy"].map((l) => (
                <a key={l} href="#" className="font-normal text-[14px] text-white leading-[22px] hover:opacity-80 transition-opacity">{l}</a>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col gap-[9px] w-full sm:w-auto">
            <p className="font-semibold text-[16px] text-white leading-6">Contact Us</p>
            <div className="flex items-center gap-[8px]">
              <svg className="w-[18px] h-[18px] shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-normal text-[14px] text-white leading-[22px]">+91 9999918900</span>
            </div>
            <div className="flex items-center gap-[8px]">
              <svg className="w-[18px] h-[18px] shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-normal text-[14px] text-white leading-[22px]">info@instantholidays.com</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "rgba(226,226,226,0.4)" }} />

        {/* Copyright */}
        <p className="font-normal text-[14px] text-white text-center leading-[22px] pb-6">
          Copyright © 2026 Instant Holidays by C &amp;K  ® - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
