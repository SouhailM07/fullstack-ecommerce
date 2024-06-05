import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
export default function Footer() {
  let links = [
    { title: "Company", txt: "About Careers Press" },
    { title: "Shope", txt: "All Products Featured Sale" },
    { title: "Support", txt: "Contact Us FAQs Shipping & Returns" },
  ];

  const socialLinks: {
    icon: IconDefinition;
    label: string;
  }[] = [
    { icon: faFacebookF, label: "Facebook" },
    { icon: faTwitter, label: "Twitter" },
    { icon: faInstagram, label: "Instagram" },
  ];
  return (
    <footer className=" bg-slate-900 text-white">
      <section className="cc px-[1rem] py-[2rem] space-y-[3rem]">
        <article>
          <ul className="grid grid-cols-4 gap-x-[1rem]">
            {links.map(({ title, txt }, i) => (
              <li key={i} className="space-y-[1rem]">
                <p className="text-[0.9rem] font-bold">{title}</p>
                <p className="text-[0.8rem]">{txt}</p>
              </li>
            ))}
            <li className="space-y-[1rem] mx-auto">
              <p className="text-[0.9rem] font-bold">Follow Us</p>
              <ul role="list" className="flex gap-x-[1.3rem]">
                {socialLinks.map((e, i) => (
                  <FontAwesomeIcon
                    role="listitem"
                    key={i}
                    icon={e.icon}
                    aria-label={e.label}
                  />
                ))}
              </ul>
            </li>
          </ul>
        </article>
        <article className="text-center text-[0.9rem] border-gray-500 border-t pt-[1.5rem]">
          @2024 Acne Ecommerce. All rights reserved.
        </article>
      </section>
    </footer>
  );
}
