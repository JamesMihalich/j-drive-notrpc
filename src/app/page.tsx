import { SignedIn, SignInButton, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs"

export default async function HomePage() {

  return (
    <div>
      
        <div>

          <SignedOut>
              <SignInButton />
              <SignUpButton />
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>


        </div> 
      <div> The Homepage!! </div>

    </div>


)


}


