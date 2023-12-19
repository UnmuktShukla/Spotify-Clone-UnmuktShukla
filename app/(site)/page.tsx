import getSongs from '@/Actions/getSongs';
import Header from '@/components/Header';
import ListItem from '@/components/ListItem'
import PageContents from './components/PageContents';

export const revalidate=0 ; 

export default async function Home() {
  const songs = await getSongs();
  
  return (
    <div className="
        bg-neutral-900
        w-full
        h-full
        rounded-lg
        overflow-hidden 
        overflow-y-auto
      ">
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
            "
          >
            Welcome Back
          </h1>
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
            "
          >
            <ListItem
              image="/Images/liked.png"
              name= "Liked Songs"
              href='/Liked'
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div
          className="flex justify-between items-center"
        >
          <h1 className="text-white text-2xl font-semibold">
            Newest Songs
          </h1>
        </div>
        <PageContents songs={songs} /> 
        
      </div>
      
    </div>
  )
}
