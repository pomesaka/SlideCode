import {
  Deck,
  Slide,
  Title,
  Subtitle,
  Body,
  CoverSlide,
  ThankYouSlide,
} from "slidecode";

export function App() {
  return (
    <div style={{ padding: "24px 16px", maxWidth: 1000, margin: "0 auto" }}>
      <Deck theme="corporate">
        <CoverSlide
          title="My Presentation"
          subtitle="Created with SlideCode"
        />
        <Slide>
          <Title size="xl">Hello World</Title>
          <Subtitle>Edit src/App.tsx to build your presentation</Subtitle>
          <div style={{ height: 16 }} />
          <Body>
            Replace this content with your own slides.
          </Body>
        </Slide>
        <ThankYouSlide subtitle="Thank you for watching" />
      </Deck>
    </div>
  );
}
