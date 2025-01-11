import { Text, View } from 'react-native';

import { useSession } from '../../ctx';
import { Button } from '~/components/Button';

export default function Index() {
  const { signOut,session,user } = useSession();
  return (
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user?.email}</Text>

      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}