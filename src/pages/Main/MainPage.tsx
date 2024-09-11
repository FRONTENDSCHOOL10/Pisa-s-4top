import SearchInput from '@/components/Input/SearchInput';
import Layout from '@/components/Main/Layout';

function MainPage() {
   return (
      <>
         <Layout hasLogo />
         <SearchInput isButton={true} />
      </>
   );
}

export default MainPage;
