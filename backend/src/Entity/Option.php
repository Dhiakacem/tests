<?php

namespace App\Entity;

use App\Repository\OptionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=OptionRepository::class)
 * @ORM\Table(name="`option`")
 *  @ApiResource(
 *     normalizationContext={"groups"={"ride:read","option:read"}},
 *     denormalizationContext={"groups"={"ride:write","option:write"}}
 * )
 */
class Option
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * 
     * @Groups({"ride:read","option:read", "ride:write","option:write"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"ride:read","option:read", "ride:write","option:write"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity=Ride::class, inversedBy="options")
     */
    private $ride;

    public function __construct()
    {
        $this->ride = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Ride>
     */
    public function getRide(): Collection
    {
        return $this->ride;
    }

    public function addRide(Ride $ride): self
    {
        if (!$this->ride->contains($ride)) {
            $this->ride[] = $ride;
        }

        return $this;
    }

    public function removeRide(Ride $ride): self
    {
        $this->ride->removeElement($ride);

        return $this;
    }
}
