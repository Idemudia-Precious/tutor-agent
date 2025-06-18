import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-6 max-sm:flex-col items-center p-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="flex gap-6 items-center max-sm:flex-col">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-full border-1 border-primary"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-3xl text-gray-800 hover:text-primary transition duration-200">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-6 max-sm:mt-6">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3 h-fit bg-white shadow-md hover:shadow-lg transition duration-200">
            <div className="flex gap-3 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={24}
                height={24}
              />
              <p className="text-3xl font-bold text-gray-800">
                {sessionHistory.length}
              </p>
            </div>
            <div className="text-sm text-gray-500">Lessons completed</div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-3 h-fit bg-white shadow-md hover:shadow-lg transition duration-200">
            <div className="flex gap-3 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={24} height={24} />
              <p className="text-3xl font-bold text-gray-800">
                {companions.length}
              </p>
            </div>
            <div className="text-sm text-gray-500">TutorAgents created</div>
          </div>
        </div>
      </section>

      <Accordion type="multiple">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked TutorAgents {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My TutorAgents {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default Profile;
