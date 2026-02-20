import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import { inviteOnlyStyles as styles } from "./InviteOnlyStyles";

export function SignedOutView() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    setSignInError(null);
    setIsSubmitting(true);

    try {
      const attempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      if (attempt.status === "complete" && attempt.createdSessionId) {
        await setActive({ session: attempt.createdSessionId });
        return;
      }

      setSignInError("Sign-in is incomplete. Please finish required verification in Clerk.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in.";
      setSignInError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>TI Skills Economy</Text>
        <Text style={styles.subtitle}>Sign in to request invite-only access.</Text>
        <TextInput
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder="Email"
          style={styles.plainInput}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.plainInput}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        {signInError ? <Text style={styles.error}>{signInError}</Text> : null}
        <Pressable style={styles.button} onPress={() => void onSignInPress()} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? "Signing in..." : "Sign in"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
