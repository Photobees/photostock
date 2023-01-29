import { Outfit } from "@next/font/google";

const outfitFont = Outfit({ subsets: ["latin"] });

const NotFoundPage = () => {
  return (
    <div className={outfitFont.className}>
      Oops ! The page you are looking for could not be found
    </div>
  );
};

export default NotFoundPage;
