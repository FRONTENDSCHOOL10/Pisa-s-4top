import SearchInput from '@/components/Input/SearchInput';
import AppBar from '@/components/Main/AppBar';

export default function MainPage() {
   return (
      <>
         <AppBar hasLogo />
         <SearchInput isButton={true} />
      </>
   );
}
