import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import { AUTHORIZED_USER_QUERY } from "@/authentication/operation";
import UserSidebar from "../UserSidebar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: AUTHORIZED_USER_QUERY,
    },
    result: { data: { queryAuthorizedUser: null } },
  },
];

describe("User sidebar component", () => {
  it("render without error and text content", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <UserSidebar />
      </MockedProvider>
    );

    // Assert
    const componentTitle = screen.getByRole("heading", { level: 3 });

    //Act
    expect(componentTitle).toBeInTheDocument();
    expect(componentTitle).toHaveTextContent("Добро пожаловать!");
  });

  it("render all links tag", () => {
    // Arrange
    render(
      <MockedProvider mocks={mocks}>
        <UserSidebar />
      </MockedProvider>
    );

    // Assert
    const currentPageLinks = screen.getAllByRole("link", { current: "page" });
    const otherPagesLinks = screen.getAllByRole("link", { current: false });

    //Act
    expect(currentPageLinks.length).toEqual(2);
    expect(otherPagesLinks.length).toEqual(2);
    for (const el of currentPageLinks) {
      expect(el).toBeInTheDocument();
    }
    for (const el of otherPagesLinks) {
      expect(el).toBeInTheDocument();
    }
  });
});
