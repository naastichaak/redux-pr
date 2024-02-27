import {
  Stack,
  Avatar,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserService, followService } from "../../services/userServices";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSelectors";
import UserPosts from "../../components/users/UserPosts";
import UserLikes from "../../components/users/UsersLikes";

function UserPage() {
  const { userId } = useParams();

  const authUser = useSelector(selectUser);

  const [user, setUser] = useState(null);

  const isAuthUser = authUser.id === +userId;

  useEffect(() => {
    getUserService(userId).then((data) => setUser(data));
  }, [userId]);

  function follow() {
    followService(userId).then((newUser) => setUser(newUser));
  }

  return (
    <div>
      {user && (
        <Stack alignItems="center" gap="12px">
          <Avatar
            src={user.avatar || undefined}
            name={user.username}
            size="xl"
          />

          <Stack gap="4px" textAlign="center">
            <Heading as="h1" size="md">
              {user.fullName}
            </Heading>
            <Text as="span" color="gray.500" fontWeight={500}>
              @{user.username}
            </Text>
            {user.bio && <Text>{user.bio}</Text>}
          </Stack>

          <ButtonGroup size="sm" variant="ghost">
            <Button>Followers {user._count.followers}</Button>
            <Button>Following {user._count.following}</Button>
          </ButtonGroup>

          {!isAuthUser && (
            <Button
              onClick={follow}
              variant={user.isFollowing ? "outline" : "solid"}
              colorScheme="blue"
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}

          <Tabs width="100%" isFitted>
            <TabList>
              <Tab>Posts</Tab>
              <Tab>Likes</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UserPosts userId={userId} />
              </TabPanel>
              <UserLikes userId={userId} />
            </TabPanels>
          </Tabs>
        </Stack>
      )}
    </div>
  );
}
export default UserPage;
