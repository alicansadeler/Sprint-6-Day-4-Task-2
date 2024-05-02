import { beforeEach, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import fs from "fs";
import path from "path";
import Offer from "../components/Offer";

const offer = fs
  .readFileSync(path.resolve(__dirname, "../components/Offer.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

const app = fs
  .readFileSync(path.resolve(__dirname, "../App.jsx"), "utf8")
  .replaceAll(/(?:\r\n|\r|\n| )/g, "");

beforeEach(() => {
  render(<App />);
});

test("App.jsx'e bootstrap css'i dokümantasyondaki gibi import edilmiş ", () => {
  expect(app.includes("bootstrap/dist/css/bootstrap.min.css")).toBe(true);
});

test("Offer.jsx'e bir functional component tanımlanmış", () => {
  render(<Offer />);
});

test("Offer.jsx'de sahteVeri import edilmiş", () => {
  expect(offer.includes("../sahteVeri")).toBe(true);
});

test("Offer.jsx'de reactstrap Carousel componenti kullanılmış", () => {
  expect(offer.includes("<Carousel")).toBe(true);
  expect(offer.includes("<CarouselCaption")).toBe(true);
  expect(offer.includes("<CarouselIndicators")).toBe(true);
  expect(offer.includes("<CarouselControl")).toBe(true);
});

test("App.jsx'de Offer componenti kullanılmış", () => {
  expect(app.includes("<Offer")).toBe(true);
});

test("Kampanya 1 Metinleri Doğru görünüyor", () => {
  screen.getByText("Kış Kampanyası");
  screen.getByText("%50 indirimli ürünler sizi bekliyor");
});

test("Kampanya 2 Metinleri Doğru görünüyor", () => {
  screen.getByText("Yanında Pazatates Kızartması");
  screen.getByText("Büyük boy alana bedava");
});

test("Kampanya 3 Metinleri Doğru görünüyor", () => {
  screen.getByText("Gel Al Kampanyası");
  screen.getByText("2. pizza bedava");
});

test("Sol-sağ butonları ve aşağıdaki slide sayısı butonları doğru sayıda render ediliyor.", () => {
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(5);
});
