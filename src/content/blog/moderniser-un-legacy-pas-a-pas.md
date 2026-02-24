---
title: Moderniser un legacy pas à pas
description: Ma méthode pour reprendre le contrôle d'une application Symfony legacy sans rupture brutale.
date: 2026-02-24
tags: [architecture, legacy, symfony, ddd]
series: fondations
draft: true
readingTime: 7
---

Architecte backend PHP / Symfony, j'interviens souvent sur des applications avec une dette technique avancée :

- fichiers procéduraux très volumineux
- logique métier dispersée
- couplage fort entre HTTP, persistence et règles métier
- usage partiel des services Symfony
- tentative de DDD amorcée mais non stabilisée

Dans ce contexte, la priorité n'est pas d'imposer une architecture idéale. La priorité est de reprendre le contrôle, collectivement.

## Vision : l'équipe avant le schéma idéal

Un système ne devient pas sain par décision individuelle. Il devient sain quand l'équipe adopte un cadre commun.

Passer d'un legacy chaotique à une architecture hexagonale stricte en une étape est rarement réaliste.

```mermaid
flowchart LR
  A[Legacy instable] --> B[Symfony structuré]
  B --> C[Découplage applicatif]
  C --> D[Isolation du domaine]
  D --> E[Architecture avancée]
```

Cette trajectoire est progressive. Elle doit être comprise et portée par l'équipe.

## Méthode : sécuriser, structurer, aligner

### 1. Stabiliser le terrain

- analyse statique progressive
- intégration continue systématique
- standards de code partagés
- tests ciblés sur les flux critiques

Objectif : protéger l'équipe contre la dérive.

### 2. Revenir à un Symfony maîtrisé

Avant toute sophistication :

- contrôleurs limités à l'orchestration
- services applicatifs explicites
- injection de dépendances stricte
- responsabilités clairement isolées

```php
final class GenerateInvoiceHandler
{
    public function __construct(
        private InvoiceRepository $invoices,
        private PaymentGateway $paymentGateway
    ) {}

    public function handle(GenerateInvoiceCommand $command): void
    {
        $invoice = Invoice::fromOrder($command->order());
        $this->invoices->save($invoice);
        $this->paymentGateway->charge($invoice);
    }
}
```

Ce type de structuration rend le code lisible et réduit la dépendance aux experts historiques.

### 3. Aligner les pratiques

Je pousse une discipline technique partagée :

- architecture claire avant sophistication
- réduction systématique du couplage
- SOLID appliqué pragmatiquement
- séparation stricte des responsabilités
- automatisation comme garde-fou permanent

```mermaid
flowchart TB
  H[HTTP Controller] --> S[Service applicatif]
  S --> D[Entités / règles domaine]
  S --> P[Ports : repository / gateway]
  P --> I[(Infrastructure)]
```

La qualité n'est pas une contrainte individuelle. C'est une responsabilité collective.

## Boucle d'amélioration continue

```mermaid
flowchart LR
  A[Mesurer la dérive] --> B[Corriger un point de friction]
  B --> C[Standardiser la pratique]
  C --> D[Automatiser le contrôle]
  D --> E[Transmettre à l'équipe]
  E --> A
```

Moderniser un legacy n'est pas un acte héroïque. C'est un travail méthodique, partagé et assumé.
