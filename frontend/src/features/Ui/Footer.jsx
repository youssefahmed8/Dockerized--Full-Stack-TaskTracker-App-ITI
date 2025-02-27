import { useSelector } from "react-redux";

function Footer() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <footer
      className={`mt-5 w-full p-4 border-t shadow md:flex md:items-center md:justify-between md:p-6 ${
        darkMode
          ? "bg-dark-bg border-dark-primary text-dark-text"
          : "bg-light-bg border-light-primary text-light-text"
      }`}
    >
      <span className="text-sm sm:text-center">
        © 2024{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          TaskTrackr™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
